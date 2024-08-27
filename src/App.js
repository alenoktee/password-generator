import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'; 

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });


  const changePasswordLength = (event) => {
    setLength(event.target.value);
    generatePassword(event.target.value, options);
  };


  const changeOptions = (option) => {
    const newOptions = { ...options, [option]: !options[option] };
    setOptions(newOptions);
    generatePassword(length, newOptions);
  };


  const generateRange = (start, end) => {
    return String.fromCharCode(...Array(end - start + 1).keys().map(i => i + start));
  };

  const generatePassword = (length, options) => {
    const charset = {
      uppercase: generateRange(65, 90), // A-Z
      lowercase: generateRange(97, 122), // a-z
      numbers: generateRange(48, 57), // 0-9
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };


    let chars = '';
    if (options.uppercase) chars += charset.uppercase;
    if (options.lowercase) chars += charset.lowercase;
    if (options.numbers) chars += charset.numbers;
    if (options.symbols) chars += charset.symbols;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
};

export default App;
