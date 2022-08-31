import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../model/Pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}
const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { currentPage, totalPage, pageSize, totalCount } = metaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying Item {(currentPage - 1) * pageSize + 1} -
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        count={totalPage}
        size="large"
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="secondary"
      />
    </Box>
  );
};

export default AppPagination;
