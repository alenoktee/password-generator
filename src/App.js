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
}

export default App;
