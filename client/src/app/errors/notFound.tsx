import { Divider, Paper, Typography, Button } from "@material-ui/core";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography variant="h3" gutterBottom>
        Ooops! we could not found what you are looking for
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Go back to shop
      </Button>
    </Container>
  );
};

export default NotFound;
