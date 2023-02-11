import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import { BASE_URL } from "../../config";

const WinerStats = () => {
  const user = useSelector((state) => state.userReducer);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/members/`).then((value) => {
      setMembers(value.data);
    });
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Par gagneurs d'âme",
      },
    },
  };

  const labels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const getMonth = (month) =>
    members.filter(
      (saul) =>
        moment(saul.createdAt).month() === month &&
        moment(saul.createdAt).year() === moment().year()
    ).length;

  const data = {
    labels,
    datasets: [
      {
        label: "Nouveaux",
        data: [
          getMonth(0) === 0 ? 1 : getMonth(0),
          getMonth(1) === 0 ? 1 : getMonth(1),
          getMonth(2) === 0 ? 1 : getMonth(2),
          getMonth(3) === 0 ? 1 : getMonth(3),
          getMonth(4) === 0 ? 1 : getMonth(4),
          getMonth(5) === 0 ? 1 : getMonth(5),
          getMonth(6) === 0 ? 1 : getMonth(6),
          getMonth(7) === 0 ? 1 : getMonth(7),
          getMonth(8) === 0 ? 1 : getMonth(8),
          getMonth(9) === 0 ? 1 : getMonth(9),
          getMonth(10) === 0 ? 1 : getMonth(10),
          getMonth(11) === 0 ? 1 : getMonth(11),
        ],
        backgroundColor: "rgb(40,166,202)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default WinerStats;
