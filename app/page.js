'use client'
import { useState, useEffect } from "react";
import { firestore } from '@/firebase';
import { Box, Modal, Typography, Stack, TextField, Button } from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); 

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100vw" height="100vh" display="flex" flexDirection="column" alignItems="center" gap={2} p={2}>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          color="black"
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField 
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              label="Item Name"
              variant="outlined"
            />
            <Button 
              variant="outlined" 
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        label="Search Items"
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <Box width="800px" bgcolor="white" border="1px solid white" p={2}>
        <Typography variant="h2" bgcolor="#ADD8E6" align="center">Inventory Items</Typography>
        <Box bgcolor="white">
          {filteredInventory.map((item) => (
            <Box key={item.name} display="flex" justifyContent="space-between" p={1} borderBottom="1px solid #ccc">
              <Typography>{item.name}</Typography>
              <Typography>{item.quantity}</Typography>
              <Button variant="outlined" onClick={() => removeItem(item.name)}>Remove</Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
