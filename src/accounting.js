import React, { useState, useRef, useEffect } from "react";
import { Container, Input, Label, Btn, Text } from "./component/theme";
import ReactTable from "./component/table";
import DataList, { InputN } from "./component/form";
import { H2 } from "./component/theme";

const Accounting = (props) => {
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const rawItemData =
        JSON.parse(localStorage.getItem("itemData")).length > 0
            ? JSON.parse(localStorage.getItem("itemData"))
            : [{ itemId: "", itemName: "" }];
    const [itemData, setItemData] = useState(rawItemData);
    const refAlert = useRef("");
    const [msg, setMsg] = useState("");
    const [total, setTotal] = useState(0);
    // YYYY-MM-DD
    const today = new Date().toISOString().substring(0, 10);
    // YYYY-MM
    const month = today.substring(0, 7);
    let rawAccountingData;

    if (JSON.parse(localStorage.getItem("accountingData")).length > 0) {
        rawAccountingData = JSON.parse(
            localStorage.getItem("accountingData")
        ).filter((item) => {
            if (item.accountingDate.includes(month)) {
                return JSON.parse(localStorage.getItem("accountingData"));
            } else {
                return;
            }
        });

        if (rawAccountingData.length < 1) {
            rawAccountingData = ["暫無資料"];
        }
    } else {
        rawAccountingData = ["暫無資料"];
    }

    const [accountingData, setAccountingData] = useState(rawAccountingData);

    useEffect(() => {
        let priceAll = 0;
        const temp = accountingData.map((item) => {
            const price = isNaN(item.accountingPrice)
                ? 0
                : parseInt(item.accountingPrice);
            priceAll = priceAll + price;
            return price;
        });
        setTotal(priceAll);
    }, []);

    const idList = itemData.map((item) => (
        <option value={item.itemId} key={item.itemId}>
            {item.itemName}
        </option>
    ));

    const handleId = (e) => {
        if (refAlert.current.style.display == "block") {
            refAlert.current.style.display = "none";
        }
        setId(e.target.value);
    };

    const handlePrice = (e) => {
        if (refAlert.current.style.display == "block") {
            refAlert.current.style.display = "none";
        }
        setPrice(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id === "" || price === "") {
            setMsg("編號或金額輸入不得為空");
            refAlert.current.style.display = "block";
            return;
        }

        if (itemData.filter((item, i) => item.itemId == id).length < 1) {
            setMsg("請確認輸入的編號為已經登記在項目表上的編號");
            refAlert.current.style.display = "block";
            return;
        }

        const name = itemData.filter((item) => item.itemId === id)[0].itemName;
        const type = itemData.filter((item) => item.itemId === id)[0].itemType;

        const newData = {
            accountingType: type,
            accountingId: id,
            accountingName: name,
            accountingPrice: price,
            accountingDate: today,
        };

        if (accountingData[0] === "暫無資料") {
            accountingData.splice(0, 1);
        }

        setTotal(total + parseInt(price));
        setAccountingData([...accountingData, newData]);
        accountingData.push(newData);
        localStorage.setItem("accountingData", JSON.stringify(accountingData));
    };

    return (
        <Container className="container">
            <form className="form row mb-5" onSubmit={handleSubmit}>
                <H2>新增記帳</H2>
                <DataList
                    text="項目編碼"
                    minLength="1"
                    maxLength="4"
                    id="accountingId"
                    inputid="accountingInputId"
                    option={idList}
                    onChange={handleId}
                ></DataList>
                <InputN
                    id="accountingPrice"
                    text="項目金額"
                    min="-100000"
                    max="100000"
                    onChange={handlePrice}
                ></InputN>
                <Container className="px-3">
                    <Btn className="btn w-100 w-lg-50">新增</Btn>
                </Container>
                <Container className="px-3 pt-3">
                    <section
                        className="alert alert-danger display-none"
                        id="alert"
                        ref={refAlert}
                    >
                        {msg}
                    </section>
                </Container>
            </form>
            <Container className="row">
                <H2>{month + " 月記帳表"}</H2>
                <ReactTable
                    data={accountingData}
                    col={JSON.parse(localStorage.getItem("accountingCol"))}
                ></ReactTable>
                <Container className="text-end mb-5">
                    <h2>總金額：{total}</h2>
                </Container>
            </Container>
        </Container>
    );
};

export default Accounting;
