import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import CountryData from 'country-data';

const CustomerSignup = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    phoneNumber: '',
    pincode: '',
    email: '',
    password: '',
    confirmPass: '',
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const customerData = {
      id: uuidv4(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      address2: formData.address2,
      city: selectedCity,
      country: CountryData.countries[selectedCountry].name,
      state: selectedStateName, 
      phoneNumber: `${selectedCountryCode}${formData.phoneNumber}`,
      pincode: formData.pincode,
    };
    const header = {
      'Content-Type': 'application/json',
    };
    setFormData({
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      phoneNumber: '',
      pincode: '',
      email: '',
      password: '',
      confirmPass: '',
    });
    if (formData.password === formData.confirmPass) {
      await axios
        .post('http://localhost:8800/customers', customerData, header)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    } else console.log('Passwords do not match');
  };

  useEffect(() => {
    console.log(selectedState + ' dd');
  }, [selectedState]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const result = await Country.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        let allCountriesName = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        //setSelectedCountryName(allCountriesName.name)

        setSelectedCountry(firstCountry);
        setIsLoading(false);
        console.log(allCountriesName);
      } catch (error) {
        setCountries([]);
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      try {
        const result = await State.getStatesOfCountry(selectedCountry);
        let allStates = [];
        allStates = [];
        allStates = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));

        const allStatesNames = result?.map(({ name }) => name);
        const [{ isoCode: firstState = '', name } = {}] = allStates;

        setSelectedStateName(allStatesNames[0]);
        setCities([]);
        setSelectedCity('');
        allStates && setStates(allStates);
        console.log(states);
        console.log(allStates);
        console.log(CountryData.countries[selectedCountry].countryCallingCodes[0]);
       // const countryCode = getCountryCodeByIsoCode(selectedCountry);
        setSelectedCountryCode(CountryData.countries[selectedCountry].countryCallingCodes[0] || '');
        setSelectedState(firstState);
      } catch (error) {
        setStates([]);
        setCities([]);
        setSelectedCity('');
      }
    };

    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const result = await City.getCitiesOfState(
          selectedCountry,
          selectedState
        );
        let allCities = [];
        allCities = result?.map(({ name }) => ({
          name,
        }));
        const [{ name: firstCity = '' } = {}] = allCities;
        setCities(allCities);
        setSelectedCity(firstCity);
      } catch (error) {
        setCities([]);
      }
    };

    getCities();
  }, [selectedState]);

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sign up as a customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email ID"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address line 1"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address line 2(Optional)"
              variant="outlined"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <InputLabel>Country</InputLabel>
            <Select
              fullWidth
              name="country"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                console.log(e.target.value);
              }}
            >
              {countries.map(({ isoCode, name }) => (
                <MenuItem value={isoCode} key={isoCode}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs={12} sm={4}>
            {states.length>0 ? (
              <div>
                <InputLabel>State</InputLabel>
                <Select
                  fullWidth
                  name="state"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    const selectedStateObject = states.find(
                      (state) => state.isoCode === e.target.value
                    );
                    setSelectedStateName(selectedStateObject?.name || '');
                  }}
                >
                  {states.map(({ isoCode, name }) => (
                    <MenuItem id={name} value={isoCode} key={isoCode}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              <div className="text-field-state">
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  name="state"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                  }}
                  required
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            {cities.length > 0 ? (
              <>
                <InputLabel>City</InputLabel>
                <Select
                  fullWidth
                  name="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                >
                  {cities.map(({ name }) => (
                    <MenuItem value={name} key={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            ) : (
              <div className="text-field-state">
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  name="state"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  required
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pin Code"
              variant="outlined"
              name="pincode"
              pattern="[0-9]{6}"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              name="confirmPass"
              type="password"
              value={formData.confirmPass}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            Already have an account? <Link to="/customerlogin">Login</Link>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CustomerSignup;
