import {
  Box,
  FormControl,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "../../components/UI/table";
import Button from "../../components/UI/button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookingFromAdmin,
  getorderThunks,
  updateOrderStatus,
} from "../../store/thunks/ordersThunks";
import { Select } from "../../components/UI/select/Select";
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
import { Icons } from "../../assets";

export const AdminOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const dispatch = useDispatch();
  const { order: orders = [] } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getorderThunks());
  }, [dispatch]);

  const filteredOrders = statusFilter
    ? orders.filter((order) => order.bookingStatus === statusFilter)
    : orders;

  const handleChangeStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, newStatus }));
    setSelectedOrder(null);
  };

  const statusOptions = [
    { value: "", label: "Все" },
    { value: "Завершен", label: "Завершен" },

    {
      value: "В ожидании",
      label: "В ожидании",
    },
    {
      value: "Подтвержден",
      label: "Подтвержден",
    },
    {
      value: "В обработке",
      label: "В обработке",
    },
    {
      value: "Отменён",
      label: "Отменён",
    },
  ];
  const handleDelete = (id) => {
    console.log("Удалить:", id);
    dispatch(deleteBookingFromAdmin(id));
  };
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Клиент", accessor: "firstName" },
    { Header: "Авто", accessor: "car" },
    {
      Header: "Срок аренды",
      accessor: (row) =>
        `${formatDate(row.dateRange?.startDate)} — ${formatDate(
          row.dateRange?.endDate
        )}`,
    },

    {
      Header: "Статус",
      accessor: "bookingStatus",
      Cell: ({ value }) => (
        <Tooltip title="Нажми подробнее" arrow>
          <Box
            sx={{
              bgcolor: {
                "В ожидании": "#f57c00",
                Подтвержден: "#2b65e4",
                "В обработке": "#1976d2",
                Отменён: "#d32f2f",
                Завершен: "#27b422",
              }[value],
              py: 0.5,
              borderRadius: 1,
              color: "white",
              display: "inline-block",
              width: 110,
              textAlign: "center",
            }}
          >
            {value}
          </Box>
        </Tooltip>
      ),
    },
    { Header: "Сумма", accessor: "rentPrice", type: "price" },
    {
      Header: "Действия",
      id: "actions",
      Cell: ({ row }) => (
        <div
          style={{ display: "flex", gap: "8px" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedOrder(row.original);
            }}
          >
            Подробнее
          </Button>
          <Tooltip title="Удалить" arrow>
            <IconButton
              onClick={() => handleDelete(row.original.id)}
              size="small"
            >
              <Icons.DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const getOrderDetails = () => [
    {
      label: "Клиент",
      value: `${selectedOrder.firstName} ${selectedOrder.lastName}`,
    },
    {
      label: "Телефон",
      value: selectedOrder.phoneNumber,
    },
    {
      label: "Машина",
      value: selectedOrder.car,
    },
    {
      label: "Начальная дата",
      value: formatDate(selectedOrder?.dateRange?.startDate),
    },
    {
      label: "Конечная дата",
      value: formatDate(selectedOrder?.dateRange?.endDate),
    },
    {
      label: "Сумма",
      value: `${selectedOrder.rentPrice} ₽`,
    },
    {
      label: "Стартовая локация",
      value: selectedOrder.pickupLocation,
    },
    {
      label: "Конечная локация",
      value: selectedOrder.returnLocation,
    },
    {
      label: "Оплата",
      value: selectedOrder.payment,
    },
    {
      label: "Статус",
      value: selectedOrder.bookingStatus,
    },
  ];

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Заказы аренды
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ width: 200 }}>
          <StyledSelect
            options={statusOptions}
            value={statusFilter}
            label={<p>Фильтр по статусу</p>}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </FormControl>
      </Box>

      <Table columns={columns} data={filteredOrders} disableRowClick />

      <Modal open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            width: "fit-content",
            mx: "auto",
            my: "20vh",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" textAlign={"center"} mb={4}>
            Детали заказа
          </Typography>
          {selectedOrder && (
            <>
              <CarInfoList>
                {getOrderDetails(selectedOrder).map(({ label, value }) => (
                  <li key={label}>
                    <span className="label">{label}</span>
                    <span className="dots" />
                    <span className="value">{value}</span>
                  </li>
                ))}
              </CarInfoList>

              <Box mt={2} display="flex" flexDirection="column" gap={5}>
                <FormControl
                  fullWidth
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: "25px",
                  }}
                >
                  <FormControl sx={{ width: 200 }}>
                    <StyledSelect
                      options={statusOptions}
                      value={selectedOrder.bookingStatus}
                      label="Изменить статус"
                      onChange={(e) =>
                        handleChangeStatus(selectedOrder.id, e.target.value)
                      }
                    />
                  </FormControl>
                </FormControl>
                <Button
                  fullWidth
                  onClick={() => setSelectedOrder(null)}
                  variant={"contained"}
                >
                  Закрыть
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};
const StyledSelect = muiStyled(Select)({
  "&.MuiInputBase-root": {
    height: "39px",
    borderRadius: "8px",
    outline: "0",
    border: "none",
  },
});
const CarInfoList = styled.ul`
  font-size: 18px;
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: #282828;
  & li {
    display: flex;
    align-items: center;
    width: 100%;
  }
  .label {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .dots {
    flex-grow: 1;
    border-bottom: 1px dotted #ccc;
    height: 1px;
    margin: 0 8px;
    overflow: hidden;
  }

  .value {
    white-space: nowrap;
    flex-shrink: 0;
  }
`;
