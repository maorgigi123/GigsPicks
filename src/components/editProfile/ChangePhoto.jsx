import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height:100vh;
    width: 100vw;
    background-color: red;
    opacity: .7;
    position: absolute;
`;

const ChangePhoto = () => {
  return (
    <SelectImages>
            <Input type="file" name='images' accept="image/jpeg, image/png, image/jpg" multiple onClick={() => setError('')} onChange={HandleImage}/>
            Select from computer
    </SelectImages>
  )
}

export default ChangePhoto