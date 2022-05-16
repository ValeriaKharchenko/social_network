const handleInputs = (id, input) => {
  if (!input) {
    document.getElementById(id).value = 'fill ';
    document.getElementById(id).classList.add('error');
    return false;
  }
  return true;
};

export default handleInputs;