import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import productAPI from "../../redux/reducers/productApi";
import { changePage } from "../../redux/reducers/productSlice";

import { sendError } from '../../utils/functions';
import { IItemsAPI } from "../../utils/interface";

import * as Components from '../../components/index';

import { Box, Container, CircularProgress, Pagination, Typography } from '@mui/material';
import { useState } from "react";

export const Home: React.FC = () => {
  const filterProduct = useSelector((state: RootState) => state.product.filterProduct);
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, error } = productAPI.useGetProductsQuery(filterProduct);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(changePage(value - 1));
    setPage(value);
  };

  if(isError) sendError(error);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container sx={{ maxWidth: { xs: '100%', md: '1200px' }, height: { md: '830px' } }}>
          <Components.Header />

          {isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', widht: '100%', height: '90vh' }}><CircularProgress color="inherit" /></Box>)}

          {!data?.items.length && (<Box sx={{ display: 'flex', justifyContent: 'center', widht: '100%' }}><Typography variant='h4'>Nenhum produto encontrado, cadastre um produto.</Typography></Box>)}

          {!isLoading && (
            <>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', width: '100%', gap: '50px', paddingTop: { md: 1, xs: 2 } }}>
                <Components.CardAddProduct />
                {data && data.items.map((item: IItemsAPI) => (
                  <Components.CardProduct key={item._id} {...item} />
                ))}
              </Box>
            </>
          )}
        </Container>

        {!isLoading && (
          <Container sx={{ maxWidth: { xs: '100%', md: '1200px' } }}>
            <Box sx={{ paddingTop: 4, paddingBottom: 2, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, alignItems: 'center' }}>
              <Box sx={{ backgroundColor: '#fff', borderRadius: '5px' }}>
                <Pagination count={data ? data.totalPages : 0} page={page} siblingCount={0} onChange={handleChangePage} size='large' shape="rounded" />
              </Box>
            </Box>
          </Container>
        )}
      </Box>
    </>
  )
}
