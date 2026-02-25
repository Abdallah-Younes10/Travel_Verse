import React from 'react'
import Input from '../../Utility/Buttons/CitySelect/BtnCitySelect'
import { Container, Row } from 'react-bootstrap'
import BtnPlaneTrip from '../../Utility/Buttons/CitySelect/BtnPlaneTrip'
import styles from "../../Style/Continent/HeroContinent.module.css";
import { Link } from 'react-router-dom';

const CitySelect = ({cities}) => {
  return (
    <Container>
        <Row className={styles.container}>
            <div className={ styles.wid }>
            <Input cities={cities} />
            </div>
            <div className={ styles.wid }>
                <Link>
                    <BtnPlaneTrip />
                </Link>
            </div>
        </Row>
    </Container>
  )
}

export default CitySelect
