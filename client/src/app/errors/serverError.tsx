import {
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ServerError = () => {
  //   const history = useHistory();
  const navigate = useNavigate();
  //   const history = useHistory();
  const { state } = useLocation() as any;

  return (
    <Container component={Paper}>
      {state ? (
        <>
          <Typography variant="h3" color="error" gutterBottom>
            {state.title}
          </Typography>
          <Divider />
          <Typography>{state?.detail || "Internal server error"}</Typography>
        </>
      ) : (
        <Typography variant="h3" gutterBottom>
          Server Error
        </Typography>
      )}
      <Button onClick={() => navigate("/catalog")}>Got to catalog Page</Button>
    </Container>
  );
};

export default ServerError;
