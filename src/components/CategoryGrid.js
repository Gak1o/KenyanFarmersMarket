import React from 'react';
import { Pressable } from 'react-native';
import { Box, Text, Grid, Icon, VStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const CategoryGrid = () => {
  const categories = [
    { name: 'Vegetables', icon: 'eco' },
    { name: 'Fruits', icon: 'apple' },
    { name: 'Cereals', icon: 'grass' },
    { name: 'Dairy', icon: 'water-drop' },
  ];

  return (
    <Box>
      <Grid columns={2} space={4}>
        {categories.map((category, index) => (
          <Pressable key={index}>
            <Box 
              bg="white" 
              rounded="lg" 
              p={4} 
              shadow={2}
              alignItems="center"
            >
              <VStack space={2} alignItems="center">
                <Icon 
                  as={MaterialIcons} 
                  name={category.icon} 
                  size="xl"
                  color="emerald.600"
                />
                <Text fontWeight="medium">{category.name}</Text>
              </VStack>
            </Box>
          </Pressable>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryGrid;
