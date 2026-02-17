-- Insert Initial Products
INSERT INTO products (id, name, category, subcategory, description, specifications, images, featured, created_at) VALUES
('1', 'High-Temperature Centrifugal Pump', 'Mechanical', 'Pumps', 'Industrial-grade centrifugal pump designed for high-temperature applications in steel mills and power plants. Capable of handling temperatures up to 350°C.', ARRAY['Max Temp: 350°C', 'Flow Rate: 500 m³/h', 'Pressure: 25 bar', 'Material: Stainless Steel 316'], ARRAY['/industrial-centrifugal-pump.jpg'], true, '2024-01-15'),
('2', 'Heavy-Duty Ball Valve', 'Mechanical', 'Valves', 'Robust ball valve for high-pressure industrial applications. Features metal-to-metal sealing for extreme conditions.', ARRAY['Size: DN50-DN300', 'Pressure: PN100', 'Temperature: -29°C to 200°C', 'Body: Carbon Steel'], ARRAY['/industrial-ball-valve.png'], true, '2024-01-20'),
('3', 'Variable Frequency Drive 500kW', 'Electrical', 'Drives', 'High-performance VFD for precise motor control in demanding industrial environments. Energy-efficient with regenerative braking.', ARRAY['Power: 500kW', 'Voltage: 380-480V', 'Efficiency: 98%', 'Protection: IP55'], ARRAY['/variable-frequency-drive-industrial.jpg'], true, '2024-02-01'),
('4', 'Industrial PLC Controller', 'Automation', 'PLCs', 'Modular PLC system for complex automation tasks. Supports multiple communication protocols and expansion modules.', ARRAY['I/O Points: 2048', 'Cycle Time: 0.5ms', 'Memory: 4MB', 'Protocols: Modbus, Profinet, EtherNet/IP'], ARRAY['/industrial-plc-controller.jpg'], true, '2024-02-10'),
('5', 'Electromagnetic Flow Meter', 'Instrumentation', 'Flow Meters', 'Precision electromagnetic flow meter for conductive liquids. Ideal for process control and billing applications.', ARRAY['Accuracy: ±0.2%', 'Size: DN10-DN2000', 'Liner: PTFE/PFA', 'Output: 4-20mA, HART'], ARRAY['/electromagnetic-flow-meter.jpg'], false, '2024-02-15'),
('6', 'High-Efficiency IE4 Motor', 'Electrical', 'Motors', 'Super premium efficiency motor meeting IE4 standards. Reduced energy consumption and lower operating costs.', ARRAY['Power: 75-315kW', 'Efficiency: IE4', 'Frame: Cast Iron', 'Cooling: IC411'], ARRAY['/industrial-electric-motor.jpg'], false, '2024-02-20'),
('7', 'Industrial Touch Panel HMI', 'Automation', 'HMIs', '15-inch industrial touch panel with high-resolution display. Rugged design for harsh environments.', ARRAY['Display: 15" TFT', 'Resolution: 1024x768', 'Protection: IP65', 'Temp Range: -20°C to 60°C'], ARRAY['/industrial-hmi-touch-panel.jpg'], false, '2024-03-01'),
('8', 'Spherical Roller Bearing', 'Mechanical', 'Bearings', 'Self-aligning spherical roller bearing for heavy radial and axial loads. Ideal for steel mill rolling equipment.', ARRAY['Bore: 100-500mm', 'Load Rating: 2000kN', 'Speed: 1500 RPM', 'Seal: Labyrinth'], ARRAY['/spherical-roller-bearing-industrial.jpg'], false, '2024-03-05');

-- Insert Initial Quotes
INSERT INTO quotes (id, name, email, phone, company, product_id, product_name, message, status, created_at) VALUES
('1', 'John Smith', 'john@steelworks.com', '+1 555-0123', 'Steel Works Inc.', '1', 'High-Temperature Centrifugal Pump', 'We need 5 units for our new processing line. Please provide pricing and lead time.', 'pending', '2024-03-10'),
('2', 'Sarah Johnson', 'sarah@powergen.com', '+1 555-0456', 'PowerGen Solutions', '3', 'Variable Frequency Drive 500kW', 'Looking for VFDs for our turbine control system. Need technical consultation.', 'contacted', '2024-03-08');

-- Insert Initial Settings
INSERT INTO settings (id, email, phone, address, business_hours) VALUES
('default', 'info@tei-solutions.com', '+1 (555) 123-4567', ARRAY['123 Industrial Avenue', 'Manufacturing District', 'City, State 12345'], ARRAY['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM'])
ON CONFLICT (id) DO NOTHING;
