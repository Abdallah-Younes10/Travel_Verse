import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DateInput from "../../Utility/Buttons/DateInput/DateInput";
import style from "../../Style/Hotel/Hotel.module.css";
import TravelerSelector from "../../Utility/DropdownFilter/TravelerSelector";
import DropdownSelect from "../../Utility/DropdownFilter/Dropdown";

const FlightFilter = ({ countryName, title ,onFilterChange }) => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    travelers: { adults: 1, seniors: 0, children: 0 },
    travelClass: "Economy",
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated); // 🟢 send to parent
  };

  const handleTravelerChange = (travelers, travelClass) => {
    const updated = { ...filters, travelers, travelClass };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

  const handleSearch = () => {
    console.log("Filters for search:", filters);
    // هنا يمكنك إرسال البيانات للـ API أو استخدام Redux أو navigate
  };

  return (
    <Container>
      <h1>Available {title} for {countryName}</h1>
      <Row className={style.info}>
        <Col>
          <DropdownSelect title="From" onChange={(val) => handleChange("from", val)} />
        </Col>

        <Col>
          <DropdownSelect title="To" onChange={(val) => handleChange("to", val)} />
        </Col>

        <Col>
          <DateInput label="Depart" value={filters.departDate} onChange={(val) => handleChange("departDate", val)} />
        </Col>

        <Col>
          <DateInput label="Return" value={filters.returnDate} onChange={(val) => handleChange("returnDate", val)} />
        </Col>

        <Col>
          <TravelerSelector
            value={filters.travelers}
            travelClass={filters.travelClass}
            onChange={handleTravelerChange}
          />
        </Col>

        <Col xs={12} className="mt-3 text-end">
          <button className="btn btn-primary" onClick={handleSearch}>Search {title}</button>
        </Col>
      </Row>
    </Container>
  );
};

export default FlightFilter;
