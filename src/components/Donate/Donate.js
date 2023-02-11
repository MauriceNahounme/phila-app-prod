import React from "react";
import "./donate.css";
import { Button } from "antd";
import Topbar from "../Navigation/Member/Topbar";
import CarouselMember from "../Navigation/Member/Carousel";
import Footer from "../Navigation/Member/Footer";

const Donate = () => {
  const donations = [
    {
      type: "Je donne ma dîme",
      description:
        "Par la dîme nous sommes conscients et reconnaissant envers Dieu pour notre travail, autant dans le domaine financier que le domaine matériel.",
      img: "./img/dime.png",
      url: "https://phila-ca.com/donations/dime/",
    },
    {
      type: "Je fais une semence pour ma vie",
      description:
        "Je décide de poser un acte de foi au travers de mes finances et je reconnais que cette action parlera en ma faveur toute ma vie.",
      img: "./img/mavie.jpg",
      url: "https://phila-ca.com/donations/mavie/",
    },
    {
      type: "Bénir le Pasteur NomaQ",
      description:
        "Par ce don, je remercie l'Eternel pour la vie de notre Pasteur et par amour pour sa dévotion dans l'oeuvre de l'Eternel, je décide de semer dans sa vie.",
      img: "./img/pasteur.jpg",
      url: "https://phila-ca.com/donations/pasteur/",
    },
    {
      type: "Je veux soutenir les projets de l'Eglise",
      description:
        "Par ce don , je soutiens les projets de l'église Phila cité des Adorateurs tels que des maraudes, l'organisation d'événements spéciaux pour le public.",
      img: "./img/eglise.jpg",
      url: "https://phila-ca.com/donations/projetseglise/",
    },
    {
      type: "Je sème pour l'achat du matériel de sonorisation",
      description:
        "Par ce don , je permets à l'église de subvenir à des besoins liés au bon déroulement du culte en présentiel et en ligne en contribuant à l'achat du matériel nécessaire",
      img: "./img/sono.jpg",
      url: "https://phila-ca.com/donations/achatmateriel/",
    },
    {
      type: "Bâtisseur de la cité des Adorateurs",
      description:
        "Par ce don, je sème pour la construction d'une église plus grande permettant d'accueillir un public plus grand et ainsi permettre à l'évangile d'être annoncé à un nombre plus grand",
      img: "./img/cite.jpg",
      url: "https://phila-ca.com/donations/constructioneglise/",
    },
  ];

  return (
    <div>
      <Topbar />
      <CarouselMember />
      <div className="donate container-fluid">
        {donations.map((don) => {
          return (
            <div className="donate-container">
              <img src={don.img} alt="don" className="donate-img" />
              <p
                style={{
                  fontSize: "1.1em",
                  textAlign: "center",
                  padding: "5px",
                }}
              >
                <strong>{don.type}</strong>
              </p>
              <p style={{ textAlign: "center", padding: "5px" }}>
                {don.description}
              </p>

              <Button type="primary" block onClick={() => window.open(don.url)}>
                Faire un don
              </Button>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
