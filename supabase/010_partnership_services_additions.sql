-- Migration 010: Add category and key_features to partnership_services

ALTER TABLE partnership_services
ADD COLUMN category TEXT,
ADD COLUMN key_features TEXT[] DEFAULT '{}';
