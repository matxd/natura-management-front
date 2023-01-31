import productAPI from "../../redux/reducers/productApi";

import { IItemsAPI } from "../../utils/interface";

import * as Components from '../../components/index';

import { sendError } from '../../utils/functions';
import { Box } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const Home: React.FC = () => {
  const filterProduct = useSelector((state: RootState) => state.product.filterProduct)

  const { data, isLoading, isError, error } = productAPI.useGetProductsQuery(filterProduct);

  if(isError) sendError(error);

  return (
    <>
      <Box sx={{ maxWidth: "100%", height: "100vh" }}>
        <Container sx={{ paddingTop: 2, maxWidth: { xs: '100%', md: '1200px' } }}>
          <Components.Header />
          {isLoading && (<h2>Carregando...</h2>)}
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', width: '100%', paddingTop: 5, gap: '50px' }}>
            {data && data.items.map((item: IItemsAPI) => (
              <Components.CardProduct key={item._id} {...item} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  )
}
