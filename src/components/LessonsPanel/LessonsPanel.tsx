import LessonCard from '../LessonCard/LessonCard';
import { Typography, Flex } from 'antd';
import { blue } from '@ant-design/colors';

export default function LessonsPanel() {
    return (
        <Flex vertical align='center'>
            <Typography.Title style={{ color: blue[4] }} >Your Lessons</Typography.Title>
            tu wlecą lekcje
        </Flex>
    )
}