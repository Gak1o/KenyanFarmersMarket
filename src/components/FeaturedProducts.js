import React from 'react';
import { Image } from 'react-native';
import { Box, Text, ScrollView, VStack, HStack, Heading, Pressable } from 'native-base';

const FeaturedProducts = () => {
  // Mock data - in production, this would come from an API
  const products = [
    {
      id: 1,
      name: 'Fresh Tomatoes',
      price: 'KES 120/kg',
      farmer: 'John Kamau',
      location: 'Kiambu',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: 2,
      name: 'Green Maize',
      price: 'KES 50/kg',
      farmer: 'Mary Wanjiku',
      location: 'Nakuru',
      image: 'https://via.placeholder.com/100'
    }
  ];

  return (
    <Box>
      <Heading size="sm" mb={4}>Featured Products</Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space={4}>
          {products.map((product) => (
            <Pressable key={product.id}>
              <Box bg="white" rounded="lg" shadow={2} width={150}>
                <Image
                  source={{ uri: product.image }}
                  style={{ height: 100, width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                />
                <VStack p={3} space={1}>
                  <Text fontWeight="bold">{product.name}</Text>
                  <Text color="emerald.600">{product.price}</Text>
                  <Text fontSize="xs" color="gray.500">{product.farmer}</Text>
                  <Text fontSize="xs" color="gray.500">{product.location}</Text>
                </VStack>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default FeaturedProducts;
