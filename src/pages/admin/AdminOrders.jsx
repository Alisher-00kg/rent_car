import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "../../components/UI/table";
import Button from "../../components/UI/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getorderThunks } from "../../store/thunks/ordersThunks";

const dummyOrders = [
  {
    id: "RNT-001",
    customer: "Роман А.",
    phone: "+7 926-693-06-77",
    car: "Toyota RAV4",
    from: "2025-06-01",
    to: "2025-06-07",
    status: "Подтвержден",
    amount: 4500,
    payment: "Карта",
    location: "Москва",
  },
  {
    id: "RNT-002",
    customer: "Марина К.",
    phone: "+7 926-693-06-77",
    car: "Skoda Rapid",
    from: "2025-06-01",
    to: "2025-06-07",
    status: "В ожидании",
    amount: 7350,
    payment: "Карта",
    location: "Москва",
  },
  {
    id: "RNT-003",
    customer: "Олег А.",
    phone: "+7 926-453-87-77",
    car: 'Peugeot Traveller"',
    from: "2025-06-01",
    to: "2025-06-07",
    status: "В ожидании",
    amount: 4580,
    payment: "Карта",
    location: "Москва",
  },
  {
    id: "RNT-004",
    customer: "Алексей А.",
    phone: "+7 926-453-06-47",
    car: "Mercedes-Benz S 450 4MATIC",
    from: "2025-06-01",
    to: "2025-06-07",
    status: "В ожидании",
    amount: 10000,
    payment: "Карта",
    location: "Москва",
  },
  {
    id: "RNT-05",
    customer: "Василий А.",
    phone: "+7 926-453-56-42",
    car: "Zeekr 009",
    from: "2025-06-01",
    to: "2025-06-07",
    status: "Отменён",
    amount: 15000,
    payment: "Карта",
    location: "Москва",
  },
];

export const AdminOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const dispatch = useDispatch();
  const { order, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getorderThunks());
  }, [dispatch]);

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Клиент", accessor: "customer" },
    { Header: "Авто", accessor: "car" },
    {
      Header: "Срок",
      accessor: (row) => `${row.from} — ${row.to}`,
    },
    {
      Header: "Статус",
      accessor: "status",
      Cell: ({ value }) => (
        <Box
          sx={{
            bgcolor: {
              "В ожидании": "warning.light",
              Подтвержден: "info.light",

              Отменён: "error.light",
            }[value],
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            color: "white",
            display: "inline-block",
          }}
        >
          {value}
        </Box>
      ),
    },
    { Header: "Сумма", accessor: "amount", type: "price" },
    {
      Header: "Действия",
      id: "actions",
      Cell: ({ row }) => (
        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOrder(row);
          }}
        >
          Подробнее
        </Button>
      ),
    },
  ];
  const handleApprove = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Подтвержден" } : order
      )
    );
    setSelectedOrder(null);
  };
  const handleCancel = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Отменён" } : order
      )
    );
    setSelectedOrder(null);
  };

  return (
    <div>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Заказы аренды
        </Typography>

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
              <MenuItem value="Отменён">Отменён</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Table columns={columns} data={filteredOrders} />

        <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
          <Box
            sx={{
              p: 4,
              bgcolor: "white",
              width: 400,
              mx: "auto",
              my: "20vh",
              borderRadius: 2,
            }}
          >
            {selectedOrder && (
              <>
                <Typography variant="h6">Детали заказа</Typography>
                <Typography>
                  <strong>Клиент:</strong> {selectedOrder.customer}
                </Typography>
                <Typography>
                  <strong>Телефон:</strong> {selectedOrder.phone}
                </Typography>
                <Typography>
                  <strong>Машина:</strong> {selectedOrder.car}
                </Typography>
                <Typography>
                  <strong>Срок аренды:</strong> {selectedOrder.from} -{" "}
                  {selectedOrder.to}
                </Typography>
                <Typography>
                  <strong>Сумма:</strong> {selectedOrder.amount} р
                </Typography>
                <Typography>
                  <strong>Локация:</strong> {selectedOrder.location}
                </Typography>
                <Typography>
                  <strong>Оплата:</strong> {selectedOrder.payment}
                </Typography>
                <Typography>
                  <strong>Статус:</strong> {selectedOrder.status}
                </Typography>

                {selectedOrder.status === "В ожидании" && (
                  <Box mt={2} display="flex" gap={2}>
                    <Button
                      fullWidth
                      color="success"
                      onClick={() => handleApprove(selectedOrder.id)}
                    >
                      Одобрить
                    </Button>
                    <Button
                      fullWidth
                      color="error"
                      onClick={() => handleCancel(selectedOrder.id)}
                    >
                      Отменить
                    </Button>
                  </Box>
                )}

                <Box mt={2}>
                  <Button fullWidth onClick={() => setSelectedOrder(null)}>
                    Закрыть
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};
