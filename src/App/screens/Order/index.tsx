import * as React from 'react';
import { useStore } from '../../../utils/store';
import { AppWrapper } from '../Main/styled';
import OrderForm from '../../../components/UI/OrderForm';
import { appWrapperId } from '../../../utils/constants';

const OrderScreen = () => {
  const {
    state: { models, objIdx, orderImages },
  } = useStore();

  return (
    <AppWrapper id={appWrapperId}>
      <OrderForm show data={models[objIdx]} images={orderImages} />
    </AppWrapper>
  );
};

export default OrderScreen;
