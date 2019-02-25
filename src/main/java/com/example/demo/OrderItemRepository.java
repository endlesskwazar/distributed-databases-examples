package com.example.demo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OrderItemRepository {

	Long insert(OrderItem model);
	
}
