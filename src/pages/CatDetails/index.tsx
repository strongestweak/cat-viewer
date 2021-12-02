import React, { FunctionComponent, useEffect, useMemo } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "reactstrap";
import {
  Link,
  useLocation,
  useNavigate,
  createSearchParams,
  useParams,
} from "react-router-dom";
import routes from "../../components/Navigation/routes";
import { useDispatch, useSelector } from "react-redux";
import { fetchImageDetails } from "../../redux/actions/cat";
import { AppState } from "../../redux/reducers";
import { Breed, ImageDetails } from "../../redux/reducers/cat";
import { Helmet } from "react-helmet";
import { text } from "../../utils";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

const CatDetails: FunctionComponent<Props> = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { imageId } = useParams();
  const imageDetails = useSelector(
    (state: AppState) => state.cat?.imageDetails
  );
  const imageDetail = useMemo<ImageDetails | null>(() => {
    if (imageId) return imageDetails[imageId];
    return null;
  }, [imageDetails, imageId]);

  const imageData = imageDetail?.data;
  const breed = useMemo<Breed>(() => {
    return (imageDetail?.data?.breeds || [])[0];
  }, [imageDetail]);

  useEffect(() => {
    if (imageId) fetchImageDetails(imageId)(dispatch);
    window.scrollTo(0, 0);
  }, [imageId]);

  return (
    <>
      <Helmet>
        <title>
          {text.title} - {breed?.name || ""} - Details
        </title>
      </Helmet>
      <Container className={"pt-5"}>
        {imageDetail?.error && !imageData ? (
          <Row>
            <Col xs={12}>
              <Alert color={"danger"}>{text.errorDisplay}</Alert>
            </Col>
          </Row>
        ) : null}
        {!imageData && imageDetail?.fetching ? (
          <Row className={"justify-content-center"}>
            <Col xs={"auto"}>
              <Spinner />
            </Col>
          </Row>
        ) : null}
        {imageData ? (
          <Row>
            <Col xs={12}>
              <Button
                tag={Link}
                color={"primary"}
                to={
                  routes.home +
                  "?" +
                  createSearchParams(
                    location.state || { breed: breed.id }
                  ).toString()
                }
                replace
              >
                Back
              </Button>
            </Col>
            <Col xs={12} className={"pt-3"}>
              <Card>
                <CardImg
                  alt="Card image cap"
                  src={imageData?.url}
                  top
                  width="100%"
                />
                <CardBody>
                  <CardTitle tag="h4">{breed.name}</CardTitle>
                  <CardTitle tag="h5">Origin: {breed.origin}</CardTitle>
                  <CardTitle tag="h6">{breed.temperament}</CardTitle>
                  <CardText>{breed.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
};

export default CatDetails;
