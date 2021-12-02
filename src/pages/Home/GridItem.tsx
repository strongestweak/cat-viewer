import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { generatePath } from "react-router";
import { Button, Card, CardBody, CardImg, Col, Row, Spinner } from "reactstrap";
import useURLParams from "../../components/UrlParamsHooks";
import { fetchCatListByBreed } from "../../redux/actions/cat";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/reducers";
import { Link } from "react-router-dom";
import routes from "../../components/Navigation/routes";
import { BreedImage } from "../../redux/reducers/cat";
import { FETCH_IMAGE_DETAILS } from "../../redux/actions/actions";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

const GridItem: FunctionComponent<Props> = (props) => {
  const params = useURLParams();
  const cat = useSelector((state: AppState) => state.cat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!breedImageData?.currentPage && params?.breed)
      fetchCatListByBreed(params?.breed)(dispatch);
  }, [params?.breed]);

  const breedImageData = useMemo(() => {
    return cat?.breedImages[params.breed];
  }, [cat?.breedImages, params.breed]);

  const loadMore = useCallback(() => {
    fetchCatListByBreed(
      params?.breed,
      breedImageData?.currentPage + 1
    )(dispatch);
  }, [breedImageData?.currentPage, params?.breed]);

  const onViewDetailsClick = (item: BreedImage) => {
    //Inject current data to redux for fast data display
    dispatch({
      type: FETCH_IMAGE_DETAILS.SUCCESS,
      payload: { imageId: item.id, data: item },
    });
  };
  return (
    <Row>
      {breedImageData?.list
        ? breedImageData?.list.map((item) => (
            <Col md={3} className={"pt-3"} key={item.id}>
              <Card>
                <CardImg alt="Card image cap" src={item.url} top width="100%" />
                <CardBody>
                  <Button
                    color={"primary"}
                    block
                    tag={Link}
                    state={params}
                    to={generatePath(routes.catDetails, {
                      imageId: item.id,
                    })}
                    onClick={() => onViewDetailsClick(item)}
                  >
                    View details
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))
        : null}
      {breedImageData?.fetching ? (
        <Col xs={12} className={"pt-3"}>
          <Row className={"justify-content-center"}>
            <Col xs={"auto"}>
              <Spinner />
            </Col>
          </Row>
        </Col>
      ) : null}
      {breedImageData?.hasNext ? (
        <Col xs={12} className={"pt-3"}>
          <Button color={"success"} onClick={loadMore}>
            Load more
          </Button>
        </Col>
      ) : null}
    </Row>
  );
};

export default GridItem;
