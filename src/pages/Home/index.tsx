import React, { FunctionComponent } from "react";
import { Alert, Col, Container, Row } from "reactstrap";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";
import { text } from "../../utils";
import BreedSelect from "./BreedSelect";
import GridItem from "./GridItem";
import useURLParams from "../../components/UrlParamsHooks";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

const HomePage: FunctionComponent<Props> = (props) => {
  const cat = useSelector((state: AppState) => state.cat);
  const params = useURLParams();
  return (
    <>
      <Container className={styles.home}>
        <Row>
          {cat?.breedError ? (
            <Col xs={12}>
              <Alert color={"danger"}>{text.errorDisplay}</Alert>
            </Col>
          ) : null}
          <Col xs={12}>
            <h1>{text.title}</h1>
          </Col>
          <Col md={3} className={"mt-3"}>
            <BreedSelect />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>{params.breed ? <GridItem /> : "No cats available"}</Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
