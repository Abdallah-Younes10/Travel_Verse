// src/Component/Home/ContainerCatCard/ContainerCatCard.jsx
import React, { useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import CategoriesCard from '../../../Utility/Cards/CategoriesCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowBigRight , ArrowBigLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Map singular types to plural API endpoints
const getApiEndpoint = (type) => {
  const pluralMap = {
    'activitie': 'activities',
    'trip': 'trips',
    'hotel': 'hotels',
    'restaurant': 'restaurants',
    'cruise': 'cruises',
    'car': 'cars',
    'flight': 'flights',
  };
  return pluralMap[type] || `${type}s`; // fallback to adding 's' if not in map
};
console.log(getApiEndpoint('activitie'));

const fetchData = async (type) => {
  const endpoint = getApiEndpoint(type);
  const res = await axios.get(`http://localhost:8000/api/${endpoint}`);
  return res.data;
};

const ContainerCatCard = ({ type, data: externalData = null, isLoading: externalLoading = null, continent = null }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const {
    data: queryData,
    isLoading,
  } = useQuery({
    queryKey: [type],
    queryFn: () => fetchData(type),
    enabled: !externalData,
    staleTime: 5 * 60 * 1000,
  });

  const rawData = externalData || queryData || [];
  const data = Array.isArray(rawData) ? rawData : rawData.data || [];

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = data.slice(startIndex, startIndex + itemsPerPage);
const { t } = useTranslation();
  console.log(data);

  return (
    <Container className="my-4">
      <h1 className="text-capitalize mb-4"> {t(`${type}`)}</h1>
      <Row className='gap-y-4'>
        {(isLoading ? Array(4).fill({}) : displayedItems).map((item, index) => (
          <Col key={index} xs="12" md="6" lg="3" >
            <CategoriesCard
              image={item?.images?.[0]}
              title={item.name || item.name_en}
              description={item.description || item.description_en}
              isLoading={isLoading}
              onClick={() => !isLoading && item?.id && navigate(`/itemdetail/${item.id}?type=${type}`, { state: { continent } })}
            />
          </Col>
        ))}
        {!isLoading && data.length === 0 && (
          <p className="text-muted text-center w-100">لا توجد بيانات متاحة حالياً.</p>
        )}
      </Row>

      {!isLoading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4 gap-3">
          <Button
            variant="outline-secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
             <ArrowBigLeft />
          </Button>
          <span className="align-self-center">
            {t('page')} {currentPage} {t('of')} {totalPages}
          </span>
          <Button
            variant="outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
                         <ArrowBigRight />

          </Button>
        </div>
      )}
    </Container>
  );
};

export default ContainerCatCard;
