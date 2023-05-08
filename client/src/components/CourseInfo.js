import {Box, Badge, Wrap, WrapItem, Text} from '@chakra-ui/react'

const getType = (type) => {
    if(type === 'thl') return ['Theory','Lab']
    if(type === 'emb') return ['Embedded Theory', 'Embedded Lab']
    if(type === 'sts') return ['Soft Skills']
}

const getCategory = (category) => {
    if(category === 'fc') return 'Foundation Core'
    if(category === 'dles') return 'Discipline Linked Engineering Sciences'
    if(category === 'dc') return 'Discipline Core'
    if(category === 'de') return 'Discipline Elective'
    if(category === 'oe') return 'Open Elective'
    if(category === 'ngc') return 'Non-Graded Core Requirement'
}

// To display information relating to selected course
const CourseInfo = ({codes, titles, credits, type, category}) => {

    const color = 'purple'
    const labColor = 'pink'

    return (
        <Wrap spacing='20px'>
            <Box margin='auto' marginTop='25px'>
                <Badge colorScheme={color} margin='0 10px 10px 5px' variant='subtle'>{getType(type)[0]}</Badge>
                <Badge colorScheme='yellow' margin='0 10px 10px 5px' variant='subtle'>{getCategory(category)}</Badge>
                <Wrap width='100%'>
                    <WrapItem>
                        <Box bg={`${color}.50`} borderRadius='5px' padding='15px 25px 20px 15px'>
                            <Text fontWeight='bold' color={`${color}.600`} marginBottom='10px'>Course Code</Text>
                            <Text fontWeight='semibold' fontSize='15px'>{codes.theory}</Text>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box bg={`${color}.50`} borderRadius='5px' padding='15px 25px 20px 15px'>
                            <Text fontWeight='bold' color={`${color}.600`} marginBottom='10px'>Course Credits</Text>
                            <Text fontWeight='semibold' fontSize='15px'>{credits.theory}</Text>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box bg={`${color}.50`} borderRadius='5px' padding='15px 25px 20px 15px'>
                            <Text fontWeight='bold' color={`${color}.600`} marginBottom='10px'>Course Title</Text>
                            <Text fontWeight='semibold' fontSize='15px'>{titles.theory}</Text>
                        </Box>
                    </WrapItem>
                </Wrap>
            </Box>

            <Box>
                {!codes.lab ? <p></p> : 
                <>
                <Badge colorScheme={labColor} margin='0 10px 10px 5px' variant='subtle'>{getType(type)[1]}</Badge>
                <Wrap width='100%'>
                    <WrapItem>
                        <Box bg={`${labColor}.50`} borderRadius='5px' padding='15px 25px 20px 15px'>
                            <Text fontWeight='bold' color={`${labColor}.600`} marginBottom='10px'>Course Code</Text>
                            <Text fontWeight='semibold' fontSize='15px'>{codes.lab}</Text>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box bg={`${labColor}.50`} borderRadius='5px' padding='15px 25px 20px 15px'>
                            <Text fontWeight='bold' color={`${labColor}.600`} marginBottom='10px'>Course Credits</Text>
                            <Text fontWeight='semibold' fontSize='15px'>{credits.lab}</Text>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box bg={`${labColor}.50`} borderRadius='5px' padding='15px 25px 20px 15px'>
                            <Text fontWeight='bold' color={`${labColor}.600`} marginBottom='10px'>Course Title</Text>
                            <Text fontWeight='semibold' fontSize='15px'>{titles.lab}</Text>
                        </Box>
                    </WrapItem>
                </Wrap>
                </>
                }
            </Box>
        </Wrap>
    )
}

export default CourseInfo