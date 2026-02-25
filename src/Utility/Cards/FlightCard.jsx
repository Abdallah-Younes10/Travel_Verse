import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useTransCurrency from "../../Hooks/useTransCurrency";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const FlightCard = ({ data }) => {
  const { t } = useTranslation();
  const [checkedValues, setCheckedValues] = useState({});
  const convertedPrice = useTransCurrency(data?.price || 0);
  const convertedOldPrice = useTransCurrency((+data?.price || 0) + 50);

  if (!data) return null;

  // إعداد stop_locations بشكل آمن
  const stopLocations = Array.isArray(data.stop_locations)
    ? data.stop_locations.join(', ')
    : typeof data.stop_locations === 'string'
    ? data.stop_locations
    : t('noStopLocations');
console.log(data);

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-3">
        <MDBCol md="12" xl="10">
          <MDBCard className="p-4 shadow-0 rounded-xl! bg-transparent h-full shadow-lg hover:shadow-xl transition-shadow duration-300 ">
            <MDBCardBody style={{ padding: "0" }}>
              <MDBRow>
                {/* الذهاب والعودة عبر Checkbox */}
                <MDBCol
                  md="12"
                  lg="5"
                  className="mb-4 mb-lg-0 d-flex align-items-center justify-content-center"
                >
                  <FormGroup>
                    {data.departure_time && (
                      <div className="dark:text-white!" style={{ marginBottom: "10px" }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                            className="dark:text-white/50!"
                              checked={checkedValues[`go-${data.id}`] || false}
                              onChange={(event) =>
                                setCheckedValues({
                                  ...checkedValues,
                                  [`go-${data.id}`]: event.target.checked,
                                })
                              }
                            />
                          }
                          label={`${data.departure_time} - ${data.arrival_time}`}
                        />
                        <div className="dark:text-white/50!" style={{ marginLeft: "30px", fontSize: "14px", color: "#666" }}>
                          {data.from} - {data.to}, {t('airline')}
                        </div>
                      </div>
                    )}

                    {data.return_departure_time && (
                      <div className="dark:text-white!">
                        <FormControlLabel
                          control={
                            <Checkbox
                              className="dark:text-white/50!"
                              checked={checkedValues[`return-${data.id}`] || false}
                              onChange={(event) =>
                                setCheckedValues({
                                  ...checkedValues,
                                  [`return-${data.id}`]: event.target.checked,
                                })
                              }
                            />
                          }
                          label={`${data.return_departure_time} - ${data.return_arrival_time}`}
                        />
                        <div className="dark:text-white!/50" style={{ marginLeft: "30px", fontSize: "14px", color: "#666" }}>
                          {data.to} - {data.from}, {t('airline')}
                        </div>
                      </div>
                    )}
                  </FormGroup>
                </MDBCol>

                {/* تفاصيل */}
                <MDBCol md="4">
                    <h4 className="dark:text-white!">{t('duration')}</h4>
                  <h5 className="dark:text-white!">{data.duration || t('unknownDuration')} {t('hours')}</h5>
                  {/* <p>{data.stop_count} stop(s)</p>
                  <p>{stopLocations}</p> */}
                </MDBCol>

                {/* السعر */}
                <MDBCol md="6" lg="3" className="border-sm-start-none border-start">
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1 dark:text-yellow-500!">{convertedPrice}</h4>
                    <span className="text-danger">
                      <s>{convertedOldPrice}</s>
                    </span>
                  </div>

                  <div className="d-flex flex-column mt-4">
                    <MDBBtn color="primary" size="sm">
                      {t('detailsBtn')}
                    </MDBBtn>
                    <MDBBtn outline color="primary" size="sm" className="mt-2">
                      {t('addToWishListBtn')}
                    </MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FlightCard;
