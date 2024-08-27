import React, { useState, useEffect } from 'react'; // Добавлен useEffect
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard'; 
import './App.css';

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

  useEffect(() => {
    generatePassword(length, options);
  }, []);

  const changePasswordLength = (event) => {
    const newLength = Math.max(0, Math.min(event.target.value, 100));
    setLength(newLength);
    generatePassword(newLength, options);
  };


  const changeOptions = (option) => {
    const newOptions = { ...options, [option]: !options[option] };
    const activeOptionsCount = Object.values(newOptions).filter(Boolean).length;

    if (activeOptionsCount > 0 || !options[option]) {
      setOptions(newOptions);
      generatePassword(length, newOptions);
    }
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

  const copyPassword = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrengthClass = (length) => {
    if (length > 15) return 'text-success'; // Зеленый
    if (length > 10) return 'text-info';    // Голубой
    if (length > 5) return 'text-warning';  // Желтый
    return 'text-danger';                   // Красный
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 text-center">
        <h2 className={getPasswordStrengthClass(password.length)}>
          {password.length > 15 ? 'Очень надежный' : password.length > 10 ? 'Надежный' : password.length > 5 ? 'Средний' : 'Ненадежный'}
        </h2>
      </Row>

      <Row className="mb-4 text-center">
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup className="mb-3">
            <Form.Control type="text" readOnly value={password} />
            <Button className="btn-accent" onClick={() => generatePassword(length, options)}>Генерировать</Button>
            <CopyToClipboard text={password} onCopy={copyPassword}>
              <Button className="btn-accent">{copied ? 'Скопировано!' : 'Копировать'}</Button>
            </CopyToClipboard>
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="d-flex align-items-center">
            <Form.Label className="me-3">Длина пароля</Form.Label>
            <Form.Range min="4" max="20" value={length} onChange={changePasswordLength} />
            <Form.Control type="number" value={length} className="ms-2" style={{ width: '60px' }} onChange={changePasswordLength} />
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="d-flex justify-content-between">
            <Form.Check type="checkbox" label="Верхний регистр" checked={options.uppercase} onChange={() => changeOptions('uppercase')} />
            <Form.Check type="checkbox" label="Нижний регистр" checked={options.lowercase} onChange={() => changeOptions('lowercase')} />
            <Form.Check type="checkbox" label="Цифры" checked={options.numbers} onChange={() => changeOptions('numbers')} />
            <Form.Check type="checkbox" label="Символы" checked={options.symbols} onChange={() => changeOptions('symbols')} />
          </div>
        </Col>
      </Row>
    </Container>
  );
  
};

export default App;