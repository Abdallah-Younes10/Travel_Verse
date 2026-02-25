import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useTranslation } from 'react-i18next';

const Footer =()=> {
  const { t } = useTranslation();

  return (
    <MDBFooter color='white' bgColor='dark' outline="light" className='text-center text-lg-start'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>{t('footer.social_connect')}</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                {t('footer.company_name')}
              </h6>
              <p>
                {t('footer.company_description')}
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t('footer.products_title')}</h6>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.products.angular')}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.products.react')}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.products.vue')}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.products.laravel')}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t('footer.useful_links')}</h6>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.links.pricing')}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.links.settings')}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.links.orders')}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t('footer.links.help')}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t('footer.contact_title')}</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                {t('footer.contact.address')}
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                {t('footer.contact.email')}
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} {t('footer.copyright_prefix')}
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          {t('footer.company_name')}
        </a>
      </div>
    </MDBFooter>
  );
}
export default Footer
