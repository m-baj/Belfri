import LessonList from '@/components/LessonList/LessonList';
import { Typography, Flex } from 'antd';
import { blue } from '@ant-design/colors';

export default function LessonsPanel() {
    return (
        <Flex vertical align='center'>
            <Typography.Title style={{ color: blue[4] }} >Your Lessons</Typography.Title>
            <LessonList id={1}/>
        </Flex>
    )
}