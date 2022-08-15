import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/Store/ConfigureStore";
import { decrement, increment } from "./CounterSlice";

const ContactPage = () => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);
  // const { data, title } = useSelector((state: CounterState) => state);
  return (
    <>
      <Typography variant="h2">
        {title} value is --- {data}
      </Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="error"
        >
          Decrement
        </Button>
        <Button
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="primary"
        >
          Increment
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ContactPage;
