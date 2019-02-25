package com.example.demo;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

@Service
public class DemoService {
    
    @Resource
    private OrderRepository orderRepository;
    
    @Resource
    private OrderItemRepository orderItemRepository;

    public String insert(Integer userId) {
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("INSERT_TEST");
        orderRepository.insert(order);

        long orderId = order.getOrderId();
        OrderItem item = new OrderItem();
        item.setOrderId(orderId);
        item.setUserId(userId);
        item.setStatus("INSERT_TEST");
        orderItemRepository.insert(item);

        return orderId + "|" + item.getOrderItemId();
    }
}
