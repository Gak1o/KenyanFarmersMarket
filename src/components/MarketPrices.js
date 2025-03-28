import React from 'react';
import { Box, Text, VStack, HStack, Heading } from 'native-base';

const MarketPrices = () => {
  // Mock data - in production, this would come from an API
  const prices = [
    { item: 'Tomatoes', price: 'KES 120/kg', trend: 'up' },
    { item: 'Potatoes', price: 'KES 80/kg', trend: 'down' },
    { item: 'Maize', price: 'KES 50/kg', trend: 'stable' },
  ];

  return (
    <Box bg="white" rounded="lg" p={4} shadow={2}>
      <Heading size="sm" mb={4}>Today's Market Prices</Heading>
      <VStack space={3}>
        {prices.map((item, index) => (
          <HStack key={index} justifyContent="space-between">
            <Text>{item.item}</Text>
            <Text fontWeight="bold">{item.price}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default MarketPrices;
