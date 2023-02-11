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
import axios from "axios";
import { BASE_URL } from "../../config";

const ServentStats = () => {
  // const user = useSelector((state) => state.userReducer);
  const [servents, setServents] = useState([]);

  const getServents = () => {
    axios.get(`${BASE_URL}/servent/`).then((value) => {
      setServents(value.data);
    });
  };

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
    "Accueil",
    "Communication",
    "Choral",
    "Ecodim",
    "Média",
    "Sécurité",
  ];

  const getDepartment = (department) =>
    servents.filter((servent) => servent.department === department).length;

  useEffect(() => {
    getServents();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Serviteurs",
        data: [
          getDepartment("Accueil"),
          getDepartment("Communication"),
          getDepartment("Choral"),
          getDepartment("Ecodim"),
          getDepartment("Média"),
          getDepartment("Sécurité"),
        ],
        backgroundColor: "rgb(40,166,202)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ServentStats;
