import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { Breed } from "../../redux/reducers/cat";
import { Helmet } from "react-helmet";
import { text } from "../../utils";
import { fetchCatBreed } from "../../redux/actions/cat";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import { AppState } from "../../redux/reducers";
import useURLParams from "../../components/UrlParamsHooks";

interface OwnProps {
  // Add some types here
  temp?: any;
}

type Props = OwnProps;

const BreedSelect: FunctionComponent<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const cat = useSelector((state: AppState) => state.cat);
  let [searchParams, setSearchParams] = useSearchParams();
  const params = useURLParams();

  useEffect(() => {
    fetchCatBreed()(dispatch);
  }, []);

  const onBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const breed = e?.target?.value;
    if (breed) params.breed = breed;
    else delete params.breed;
    setSearchParams({ ...params });
  };

  const breedNameById = useCallback(
    (breedId: string): string => {
      const breed: Breed | undefined = cat.breedList.find(
        (e) => e.id === params.breed
      );
      return breed?.name || "";
    },
    [params, cat]
  );
  return (
    <>
      <Helmet>
        <title>
          {breedNameById(params.breed)
            ? text.title + " - " + breedNameById(params.breed)
            : text.title}
        </title>
      </Helmet>
      <Form>
        <FormGroup>
          <Label for="breed">Breed</Label>
          <Input
            value={params.breed}
            id="breed"
            name="breed"
            type="select"
            onChange={onBreedChange}
          >
            <option selected value={""}>
              {cat?.fetchingBreed ? "Loading" : "Select breed"}
            </option>
            {(cat?.breedList || []).map((breed: Breed) => (
              <option value={breed.id} key={breed.id}>
                {breed.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Form>
    </>
  );
};

export default BreedSelect;
