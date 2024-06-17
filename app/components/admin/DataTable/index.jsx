"use client";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid-pro";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export function DataTableBinance({
  assets,
  deposit,
  withdraw,
  orders,
  history,
}) {
  const newHistory = history.map((row) => {
    return {
      ...row,
      createdAt: new Date(row.createdAt),
      id: randomId(),
    };
  });

  const newAssetsCurrent = assets[0].map((row) => {
    return {
      ...row,
      id: randomId(),
    };
  });

  const [rows, setRows] = React.useState(newHistory);
  const [rowsAssets, setRowsAssets] = React.useState(newAssetsCurrent);

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rowModesModelAssets, setRowModesModelAssets] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  /////////////////////////////////////////////
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const processRowUpdateAssets = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRowsAssets(
      rowsAssets.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };
  /////////////////////////////////////////////

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowModesModelChangeAssets = (newRowModesModel) => {
    setRowModesModelAssets(newRowModesModel);
  };

  const columnsHistory = [
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      editable: true,
    },
    /*{
      field: "id",
      headerName: "Column Mui ID",
      type: "string",
    },*/
    {
      field: "idHistory",
      headerName: "ID Transaction History",
      type: "string",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "orderId",
      headerName: "Order ID",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "txId",
      headerName: "Transaction ID",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "fromAmount",
      headerName: "From Amount",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "fromAsset",
      headerName: "From Asset",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "toAsset",
      headerName: "To Asset",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "toAmount",
      headerName: "To Amount",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "ratio",
      headerName: "Ratio",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "side",
      headerName: "Side",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      flex: 1,
      editable: true,
    },
    {
      field: "transactionFee",
      headerName: "Transaction Fee",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      headerName: "Actions",
      //width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const columnsBalances = [
    {
      field: "asset",
      headerName: "Asset",
      flex: 1,
      editable: true,
    },
    /*{
      field: "id",
      headerName: "Column Mui ID",
      type: "string",
    },*/
    {
      field: "free",
      headerName: "Free",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price USDT",
      type: "string",
      flex: 1,
    },
    {
      field: "totalUSDT",
      headerName: "Total USDT",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "locked",
      headerName: "Locked",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "freeze",
      headerName: "Freeze",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "withdrawing",
      headerName: "Withdrawing",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "ipoable",
      headerName: "Ipoable",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "btcValuation",
      headerName: "BTC Valuation",
      type: "string",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      headerName: "Actions",
      //width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div className="h-screen content-center">
      <div className="my-12">
        <h2 className="text-black text-xl">
          Depositos, Retiros y Ordenes de Compra/Venta
        </h2>
      </div>
      <div className="">
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGridPro
            rows={rows}
            columns={columnsHistory}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </div>
      <div className="my-12">
        <h2 className="text-black text-xl">Activos Actuales</h2>
      </div>
      <div className="mt-12">
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
          }}
        >
          <DataGridPro
            rows={rowsAssets}
            columns={columnsBalances}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChangeAssets}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdateAssets}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </Box>
      </div>
    </div>
  );
}
