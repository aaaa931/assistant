import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { Container, Typography, Box, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounting, selectAccountingData } from "./accountingSlice";
import { useEffect } from "react";
import { fetchItem, selectItemData } from "./itemSlice";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = (props) => {
    const month = new Date().toISOString().substring(0, 7);
    const accountingData = useSelector(selectAccountingData);
    const noData = "暫無資料";
    const data =
        accountingData.length > 0
            ? accountingData
            : [
                  {
                      accountingId: noData,
                      accountingName: noData,
                      accountingPrice: "1",
                  },
              ];
    const itemData = useSelector(selectItemData);
    const dispatch = useDispatch();
    let dataMap = new Map();
    console.log("data :>> ", data);

    data.map((acc) => {
        const id = acc.accountingId;
        const price = acc.accountingPrice;
        const type =
            itemData.length > 0
                ? itemData.find((item) => item.itemId === id).itemType
                : noData;

        if (acc.accountingId === noData) {
            return dataMap.set(noData, parseInt(price));
        }
        console.log("type :>> ", type);

        if (dataMap.get(type)) {
            return dataMap.set(type, dataMap.get(type) + parseInt(price));
        } else {
            return dataMap.set(type, parseInt(price));
        }
    });

    console.log("dataMap :>> ", dataMap);

    useEffect(() => {
        async function init() {
            const filter = {
                accountingDate: month,
            };

            await dispatch(fetchAccounting(filter));
            await dispatch(fetchItem());
        }

        init();
    }, []);

    const bar_opt = (type = "x") => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                title: {
                    display: true,
                    text: month + " 月長條圖",
                },
            },
        };
    };

    const pie_option = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: month + " 月圓餅圖",
            },
        },
    };

    const labels = Array.from(dataMap.keys());
    let nums = [];

    for (let entry of dataMap) {
        nums.push(entry[1]);
    }

    console.log("nums :>> ", nums);
    console.log("keys :>> ", labels);

    const bgc = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(212, 237, 244, 0.2)",
        "rgba(255, 182, 185, 0.2)",
        "rgba(249, 188, 221, 0.2)",
        "rgba(255, 241, 172, 0.2)",
        "rgba(255, 0, 0, 0.2)",
        "rgba(0, 255, 0, 0.2)",
        "rgba(0, 0, 255, 0.2)",
        "rgba(0, 223, 252, 0.2)",
        "rgba(8, 255, 200, 0.2)",
    ];
    const bdc = [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(255, 182, 185, 1)",
        "rgba(249, 188, 221, 1)",
        "rgba(255, 241, 172, 1)",
        "rgba(255, 0, 0, 1)",
        "rgba(0, 255, 0, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 223, 252, 1)",
        "rgba(8, 255, 200, 1)",
    ];

    const chartData = {
        labels,
        datasets: [
            {
                label: "金額",
                data: nums,
                backgroundColor: bgc,
                borderColor: bdc,
                borderWidth: 1,
            },
        ],
    };

    const ChartArea = (props) => (
        <Box>
            <Typography variant="h3" textAlign="center" mt={3}>
                {props.title}
            </Typography>
            <Divider sx={{ marginY: 3 }} />
            {props.chart}
        </Box>
    );

    return (
        <Container>
            <ChartArea
                title="圓餅圖"
                chart={<Pie options={pie_option} data={chartData} />}
            ></ChartArea>
            <ChartArea
                title="縱向長條圖"
                chart={<Bar options={bar_opt} data={chartData} />}
            ></ChartArea>
            <ChartArea
                title="橫向長條圖"
                chart={<Bar options={() => bar_opt("y")} data={chartData} />}
            ></ChartArea>
        </Container>
    );
};

export default Dashboard;
