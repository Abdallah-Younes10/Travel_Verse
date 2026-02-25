import React from "react";
import styles from "../../Style/Continent/HeroContinent.module.css";

const HeroContinent = ({ backgroundImage, countryName, description, images }) => {
// console.log(backgroundImage)
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* تأثير جانبي */}
      <div className={styles.slash}></div>

      {/* العنوان الرئيسي */}
      <header>
        {/* <h2>Amazing</h2> */}
        <h1>
          <span>{countryName}</span>
        </h1>
        <p>{description}</p>
      </header>

      {/* الصور الجانبية */}
      <div className={`${styles.image_container} hidden! lg:flex! `}>
        {images?.map((image, index) => (
          <div
            key={index}
            className={`${styles[image.className]}`}
            style={{ backgroundImage: image.src ? `url(${image.src})` : "none" }}
          >
            {image.text && <p style={{ whiteSpace: "pre-wrap" }}>{image.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContinent;
