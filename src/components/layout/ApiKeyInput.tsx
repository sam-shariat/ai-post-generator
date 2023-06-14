import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Center, IconButton, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from 'react';
import { apiAtom } from "utils/config";
import { useAtom } from "jotai";

export default function ApiKeyInput(){
    const [apikey, setApikey] = useAtom(apiAtom)
    function truncKey(key:string){
        if(key === '' || key === undefined) return ''
        return key.slice(0,4) + "..." + key.slice(key.length-4)
    }
    const [v,setV] = useState(false)
    return (
        <Center width={'100%'} my={6}>
            <InputGroup>
            <Input onFocus={()=> setV(true)} onBlur={()=> setV(false)} size={'lg'} placeholder="sk-Ezv****VMM" value={v ? apikey : truncKey(apikey)} onChange={(e)=> setApikey(e.target.value)} />
            <InputRightElement>
            <IconButton mt={2} mr={2} variant={'ghost'} aria-label="show-api-key-button" onClick={()=> setV(!v)}>{!v ? <LockIcon/> : <UnlockIcon/>}</IconButton>
            </InputRightElement>
            </InputGroup>
        </Center>
    )
}