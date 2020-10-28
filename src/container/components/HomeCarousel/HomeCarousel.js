import React from "react";
import { 
  MDBCarousel, MDBCarouselInner, 
  MDBCarouselItem, MDBView,
  MDBCarouselCaption,MDBBtn
} from "mdbreact";
import { Link } from 'react-router-dom'
import './HomeCarousel.css'

const HomeCarousel = () => {
  return (
    <>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                style={{ opacity:'0.5'}}
                className="d-block w-100 img-carousel"
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="First slide"
              />
            </MDBView>
            <MDBCarouselCaption>
              <img
                style={{margin:'auto', borderRadius:'50%', opacity:'0.7'}}
                src="https://instagram.fcor2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/104384444_176901553788819_1692942001212903353_n.jpg?_nc_ht=instagram.fcor2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=pZ5eDZzK8I0AX9JkHQm&oh=f1e4f31484c2c842f4c0a13dbec41bce&oe=5F4B1090"
                alt="e-26 logo" width="200px" height="200px" />
                <br/>
              <Link to="/products/"> 
                <MDBBtn color="outline-white">
                  Nuestros Productos
                </MDBBtn>
              </Link>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                style={{ opacity:'0.5'}}
                className="d-block w-100 img-carousel"
                src="https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Second slide"
              />
            </MDBView>
            <MDBCarouselCaption>
              <img
                style={{margin:'auto', borderRadius:'50%', opacity:'0.7'}}
                src="https://instagram.fcor2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/104384444_176901553788819_1692942001212903353_n.jpg?_nc_ht=instagram.fcor2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=pZ5eDZzK8I0AX9JkHQm&oh=f1e4f31484c2c842f4c0a13dbec41bce&oe=5F4B1090"
                alt="e-26 logo" width="200px" height="200px" />
                <br/>
              <Link to="/products/"> 
                <MDBBtn color="outline-white">
                  Nuestros Productos
                </MDBBtn>
              </Link>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                style={{ opacity:'0.5'}}
                className="d-block w-100 img-carousel"
                src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="Third slide"
              />
            </MDBView>
            <MDBCarouselCaption>
              <img
                style={{margin:'auto', borderRadius:'50%', opacity:'0.7'}}
                src="https://instagram.fcor2-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/104384444_176901553788819_1692942001212903353_n.jpg?_nc_ht=instagram.fcor2-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=pZ5eDZzK8I0AX9JkHQm&oh=f1e4f31484c2c842f4c0a13dbec41bce&oe=5F4B1090"
                alt="e-26 logo" width="200px" height="200px" />
                <br/>
              <Link to="/products/"> 
                <MDBBtn color="outline-white">
                  Nuestros Productos
                </MDBBtn>
              </Link>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </>
  );
}

export default HomeCarousel;