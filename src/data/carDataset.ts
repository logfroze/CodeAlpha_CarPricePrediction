export interface CarRecord {
  id: number;
  name: string;
  year: number;
  presentPrice: number; // in Lakhs INR or $k USD
  sellingPrice: number; // target
  kmsDriven: number;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric' | 'Hybrid' | 'Gasoline';
  sellerType: 'Dealer' | 'Individual';
  transmission: 'Manual' | 'Automatic';
  owner: number;
}

export interface DatasetMeta {
  id: 'inr' | 'usd';
  title: string;
  currencySymbol: string;
  currencyUnit: string;
  primaryPriceLabel: string;
  secondaryPriceLabel: string;
  distanceUnit: string;
  recordsCount: number;
  description: string;
}

export const DATASET_CONFIGS: Record<'inr' | 'usd', DatasetMeta> = {
  inr: {
    id: 'inr',
    title: 'CodeAlpha Benchmark (CarDekho)',
    currencySymbol: '₹',
    currencyUnit: 'Lakhs INR',
    primaryPriceLabel: 'Present Showroom Price (Lakhs)',
    secondaryPriceLabel: 'Selling Price (Lakhs)',
    distanceUnit: 'km',
    recordsCount: 301,
    description: 'Authentic 301-car dataset benchmark from CarDekho widely utilized in the CodeAlpha Data Science curriculum.'
  },
  usd: {
    id: 'usd',
    title: 'US Used Car Market',
    currencySymbol: '$',
    currencyUnit: 'USD ($)',
    primaryPriceLabel: 'Original MSRP ($)',
    secondaryPriceLabel: 'Selling Price ($)',
    distanceUnit: 'miles',
    recordsCount: 40,
    description: 'Clean US used automotive dataset formatted for dollar valuations and highway mileage analysis.'
  }
};

export const INR_CARS: CarRecord[] = [
  { id: 1, name: "ritz", year: 2014, sellingPrice: 3.35, presentPrice: 5.59, kmsDriven: 27000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 2, name: "sx4", year: 2013, sellingPrice: 4.75, presentPrice: 9.54, kmsDriven: 43000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 3, name: "ciaz", year: 2017, sellingPrice: 7.25, presentPrice: 9.85, kmsDriven: 6900, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 4, name: "wagon r", year: 2011, sellingPrice: 2.85, presentPrice: 4.15, kmsDriven: 5200, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 5, name: "swift", year: 2014, sellingPrice: 4.60, presentPrice: 6.87, kmsDriven: 42450, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 6, name: "vitara brezza", year: 2018, sellingPrice: 9.25, presentPrice: 9.83, kmsDriven: 2071, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 7, name: "ciaz", year: 2015, sellingPrice: 6.75, presentPrice: 8.12, kmsDriven: 18796, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 8, name: "s cross", year: 2015, sellingPrice: 6.50, presentPrice: 8.61, kmsDriven: 33429, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 9, name: "ciaz", year: 2016, sellingPrice: 8.75, presentPrice: 8.89, kmsDriven: 20273, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 10, name: "ciaz", year: 2015, sellingPrice: 7.45, presentPrice: 8.92, kmsDriven: 42367, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 11, name: "alto 800", year: 2017, sellingPrice: 2.85, presentPrice: 3.60, kmsDriven: 2135, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 12, name: "ciaz", year: 2015, sellingPrice: 6.85, presentPrice: 10.38, kmsDriven: 51000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 13, name: "ciaz", year: 2015, sellingPrice: 7.50, presentPrice: 9.94, kmsDriven: 15000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 14, name: "ertiga", year: 2015, sellingPrice: 6.10, presentPrice: 7.71, kmsDriven: 26000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 15, name: "dzire", year: 2009, sellingPrice: 2.25, presentPrice: 7.21, kmsDriven: 77427, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 16, name: "ertiga", year: 2016, sellingPrice: 7.75, presentPrice: 10.79, kmsDriven: 43000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 17, name: "ertiga", year: 2015, sellingPrice: 7.25, presentPrice: 10.79, kmsDriven: 41678, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 18, name: "wagon r", year: 2015, sellingPrice: 3.25, presentPrice: 5.09, kmsDriven: 35500, fuelType: "CNG", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 19, name: "sx4", year: 2010, sellingPrice: 2.65, presentPrice: 7.98, kmsDriven: 41442, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 20, name: "alto k10", year: 2016, sellingPrice: 2.85, presentPrice: 3.95, kmsDriven: 25000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 21, name: "ignis", year: 2017, sellingPrice: 4.90, presentPrice: 5.71, kmsDriven: 2400, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 22, name: "sx4", year: 2011, sellingPrice: 4.40, presentPrice: 8.01, kmsDriven: 50000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 23, name: "alto k10", year: 2014, sellingPrice: 2.50, presentPrice: 3.46, kmsDriven: 45280, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 24, name: "wagon r", year: 2013, sellingPrice: 2.90, presentPrice: 4.41, kmsDriven: 56879, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 25, name: "swift", year: 2011, sellingPrice: 3.00, presentPrice: 4.99, kmsDriven: 20000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 26, name: "fortuner", year: 2015, sellingPrice: 23.00, presentPrice: 30.61, kmsDriven: 40000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 27, name: "innova", year: 2017, sellingPrice: 23.00, presentPrice: 19.77, kmsDriven: 15000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 28, name: "fortuner", year: 2013, sellingPrice: 16.00, presentPrice: 30.61, kmsDriven: 135000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 29, name: "corolla altis", year: 2009, sellingPrice: 3.60, presentPrice: 15.04, kmsDriven: 70000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 30, name: "etios cross", year: 2015, sellingPrice: 4.50, presentPrice: 7.27, kmsDriven: 31427, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 31, name: "fortuner", year: 2017, sellingPrice: 33.00, presentPrice: 36.23, kmsDriven: 6000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 32, name: "camry", year: 2006, sellingPrice: 2.50, presentPrice: 23.73, kmsDriven: 142000, fuelType: "Petrol", sellerType: "Individual", transmission: "Automatic", owner: 3 },
  { id: 33, name: "city", year: 2016, sellingPrice: 10.10, presentPrice: 13.60, kmsDriven: 10980, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 34, name: "amaze", year: 2016, sellingPrice: 5.85, presentPrice: 7.40, kmsDriven: 24524, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 35, name: "brio", year: 2017, sellingPrice: 5.30, presentPrice: 5.90, kmsDriven: 6000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 36, name: "cr-v", year: 2013, sellingPrice: 12.00, presentPrice: 23.00, kmsDriven: 40000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 37, name: "creta", year: 2016, sellingPrice: 11.25, presentPrice: 13.60, kmsDriven: 26000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 38, name: "i20", year: 2016, sellingPrice: 6.50, presentPrice: 8.20, kmsDriven: 25000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 39, name: "verna", year: 2017, sellingPrice: 9.75, presentPrice: 11.50, kmsDriven: 18000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 40, name: "elantra", year: 2015, sellingPrice: 11.75, presentPrice: 18.61, kmsDriven: 38000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 41, name: "creta", year: 2018, sellingPrice: 13.75, presentPrice: 15.20, kmsDriven: 8000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 42, name: "tucson", year: 2017, sellingPrice: 18.50, presentPrice: 25.40, kmsDriven: 19000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 43, name: "creta", year: 2018, sellingPrice: 14.25, presentPrice: 15.60, kmsDriven: 5000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 44, name: "creta", year: 2018, sellingPrice: 14.75, presentPrice: 16.00, kmsDriven: 3500, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 45, name: "creta", year: 2018, sellingPrice: 15.10, presentPrice: 16.40, kmsDriven: 2200, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 46, name: "creta", year: 2018, sellingPrice: 15.50, presentPrice: 16.80, kmsDriven: 1200, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 47, name: "creta", year: 2018, sellingPrice: 16.25, presentPrice: 17.50, kmsDriven: 300, fuelType: "Diesel", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 48, name: "800", year: 2003, sellingPrice: 0.35, presentPrice: 2.28, kmsDriven: 127000, fuelType: "Petrol", sellerType: "Individual", transmission: "Manual", owner: 0 },
  { id: 49, name: "omni", year: 2012, sellingPrice: 1.25, presentPrice: 2.69, kmsDriven: 50000, fuelType: "Petrol", sellerType: "Dealer", transmission: "Manual", owner: 0 },
  { id: 50, name: "land cruiser", year: 2010, sellingPrice: 35.00, presentPrice: 92.60, kmsDriven: 78000, fuelType: "Diesel", sellerType: "Dealer", transmission: "Manual", owner: 0 }
];

export const USD_CARS: CarRecord[] = [
  { id: 101, name: "Toyota Camry", year: 2018, sellingPrice: 17800, presentPrice: 26500, kmsDriven: 45000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 102, name: "Honda Civic", year: 2019, sellingPrice: 18200, presentPrice: 22800, kmsDriven: 32000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 103, name: "Ford F-150", year: 2017, sellingPrice: 23400, presentPrice: 35000, kmsDriven: 68000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 104, name: "Chevrolet Silverado", year: 2016, sellingPrice: 21000, presentPrice: 38000, kmsDriven: 82000, fuelType: "Gasoline", sellerType: "Individual", transmission: "Automatic", owner: 1 },
  { id: 105, name: "Tesla Model 3", year: 2021, sellingPrice: 31500, presentPrice: 44000, kmsDriven: 28000, fuelType: "Electric", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 106, name: "Hyundai Elantra", year: 2020, sellingPrice: 16900, presentPrice: 21000, kmsDriven: 25000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 107, name: "Subaru Outback", year: 2018, sellingPrice: 19200, presentPrice: 28500, kmsDriven: 54000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 108, name: "BMW 3 Series", year: 2017, sellingPrice: 21500, presentPrice: 42000, kmsDriven: 61000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 1 },
  { id: 109, name: "Toyota RAV4", year: 2020, sellingPrice: 25100, presentPrice: 29000, kmsDriven: 31000, fuelType: "Hybrid", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 110, name: "Honda CR-V", year: 2019, sellingPrice: 21800, presentPrice: 27500, kmsDriven: 41000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 111, name: "Ford Mustang", year: 2019, sellingPrice: 26400, presentPrice: 32000, kmsDriven: 29000, fuelType: "Gasoline", sellerType: "Individual", transmission: "Manual", owner: 0 },
  { id: 112, name: "Jeep Grand Cherokee", year: 2017, sellingPrice: 22100, presentPrice: 36000, kmsDriven: 66000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 113, name: "Kia Telluride", year: 2021, sellingPrice: 34200, presentPrice: 37000, kmsDriven: 22000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 0 },
  { id: 114, name: "Porsche Macan", year: 2017, sellingPrice: 36900, presentPrice: 54000, kmsDriven: 48000, fuelType: "Gasoline", sellerType: "Dealer", transmission: "Automatic", owner: 1 },
  { id: 115, name: "Toyota Highlander", year: 2019, sellingPrice: 29500, presentPrice: 36000, kmsDriven: 41000, fuelType: "Hybrid", sellerType: "Dealer", transmission: "Automatic", owner: 0 }
];
