
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import { useState } from 'react';
import { Table } from '../../components/UI/table';
import Button from '../../components/UI/button/Button';

const dummyOrders = [
  {
    id: 'RNT-001',
    customer: 'Айбек А.',
    phone: '+996 500 123 456',
    car: 'Toyota Camry',
    from: '2025-06-01',
    to: '2025-06-07',
    status: 'Подтвержден',
    amount: 35000,
    payment: 'Карта',
    location: 'Бишкек, ул. Киевская',
  },

]


export const AdminOrders = () => {
  const [orders] = useState(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Клиент', accessor: 'customer' },
    { Header: 'Авто', accessor: 'car' },
    {
      Header: 'Срок',
      accessor: (row) => `${row.from} — ${row.to}`,
    },
    {
      Header: 'Статус',
      accessor: 'status',
      Cell: ({ value }) => (
        <Box
          sx={{
            bgcolor: {
              'В ожидании': 'warning.light',
              'Подтвержден': 'info.light',
              'Завершен': 'success.light',
              'Отменён': 'error.light',
            }[value],
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            color: 'white',
            display: 'inline-block',
          }}
        >
          {value}
        </Box>
      ),
    },
    { Header: 'Сумма', accessor: 'amount', type: 'price' },
    {
      Header: 'Действия',
      id: 'actions',
      Cell: ({ row }) => (
        <Button size="small" onClick={(e) => {
          e.stopPropagation();
          setSelectedOrder(row);
        }}>
          Подробнее
        </Button>
      ),
    },
  ];

  return <div>   
    <Box p={3}>
    <Typography variant="h4" gutterBottom>Заказы аренды</Typography>

    <Box display="flex" gap={2} mb={3}>
      <FormControl>
        <InputLabel>Статус</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          label="Статус"
          sx={{ width: 200 }}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="В ожидании">В ожидании</MenuItem>
          <MenuItem value="Подтвержден">Подтвержден</MenuItem>
          <MenuItem value="Завершен">Завершен</MenuItem>
          <MenuItem value="Отменён">Отменён</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Table columns={columns} data={filteredOrders} />

    <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
      <Box sx={{ p: 4, bgcolor: 'white', width: 400, mx: 'auto', my: '20vh', borderRadius: 2 }}>
        {selectedOrder && (
          <>
            <Typography variant="h6">Детали заказа</Typography>
            <Typography><strong>Клиент:</strong> {selectedOrder.customer}</Typography>
            <Typography><strong>Телефон:</strong> {selectedOrder.phone}</Typography>
            <Typography><strong>Машина:</strong> {selectedOrder.car}</Typography>
            <Typography><strong>Срок аренды:</strong> {selectedOrder.from} - {selectedOrder.to}</Typography>
            <Typography><strong>Сумма:</strong> {selectedOrder.amount} руб</Typography>
            <Typography><strong>Локация:</strong> {selectedOrder.location}</Typography>
            <Typography><strong>Оплата:</strong> {selectedOrder.payment}</Typography>
            <Typography><strong>Статус:</strong> {selectedOrder.status}</Typography>
            <Box mt={2}>
              <Button fullWidth onClick={() => setSelectedOrder(null)}>Закрыть</Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  </Box>
  </div>
};
