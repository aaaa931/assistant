import React, { useRef } from "react";
import theme, { Container, Btn } from "./component/theme";
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
    const chartType = ["圓餅圖", "長條圖"];
    const month = new Date().toISOString().substring(0, 7);
    const data =
        JSON.parse(localStorage.getItem("accountingData")) != ""
            ? JSON.parse(localStorage.getItem("accountingData"))
            : [
                  {
                      accountingType: "暫無資料",
                      accountingName: "暫無資料",
                      accountingPrice: 1,
                  },
              ];
    let dataMap = new Map();
    data.map((item) => {
        if (dataMap.get(item.accountingType)) {
            return dataMap.set(
                item.accountingType,
                dataMap.get(item.accountingType) +
                    parseInt(item.accountingPrice)
            );
        } else {
            return dataMap.set(
                item.accountingType,
                parseInt(item.accountingPrice)
            );
        }
    });

    const bar_option = {
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

    const bar_horizontal_option = {
        indexAxis: "y",
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

    const chart_data = {
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
        <section className="mb-5">
            <h2 className="text-center">{props.title}</h2>
            <hr />
            {props.chart}
        </section>
    );

    return (
        <Container className="container my-5">
            <ChartArea
                title="圓餅圖"
                chart={<Pie options={pie_option} data={chart_data} />}
            ></ChartArea>
            <ChartArea
                title="縱向長條圖"
                chart={<Bar options={bar_option} data={chart_data} />}
            ></ChartArea>
            <ChartArea
                title="橫向長條圖"
                chart={
                    <Bar options={bar_horizontal_option} data={chart_data} />
                }
            ></ChartArea>
        </Container>
    );
};

export default Dashboard;
