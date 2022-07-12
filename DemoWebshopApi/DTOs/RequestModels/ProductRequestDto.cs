﻿namespace DemoWebshopApi.DTO.RequestModels
{
    public class ProductRequestDto
    {
        public string Name { get; set; }

        public string Model { get; set; }

        public int AvailableQuantity { get; set; }

        public double Price { get; set; }
    }
}