// File: frontend/src/components/AlertCard.jsx

import React from 'react';
import { Card, Text, Badge, Group, Tooltip, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconAlertTriangle, IconUserCircle, IconMapPin } from '@tabler/icons-react';

const AlertCard = ({ alert, onInspect }) => {
  const theme = useMantineTheme();

  // Determine badge color based on risk score
  const getRiskColor = (score) => {
    if (score >= 90) return 'red';
    if (score >= 70) return 'orange';
    return 'yellow';
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      mb="md"
      style={{
        backgroundColor: theme.colors.dark[6],
        borderColor: theme.colors[getRiskColor(alert.risk_score)][7],
        cursor: 'pointer'
      }}
      onClick={() => onInspect(alert)}
    >
      <Group position="apart" mt="md" mb="xs">
        <Group spacing="sm">
          <IconAlertTriangle size={24} color={theme.colors[getRiskColor(alert.risk_score)][7]} />
          <Text weight={700}>Anomaly Detected</Text>
        </Group>
        <Badge color={getRiskColor(alert.risk_score)} variant="filled" size="lg">
          Risk: {alert.risk_score}
        </Badge>
      </Group>

      <Text color="dimmed" size="sm" mt="sm">
        <Group spacing="xs">
          <IconUserCircle size={16} />
          <span>User: <Text component="span" weight={500}>{alert.user}</Text></span>
        </Group>
      </Text>
      
      <Text color="dimmed" size="sm">
        <Group spacing="xs">
          <IconMapPin size={16} />
          <span>Location: <Text component="span" weight={500}>{alert.location}</Text></span>
        </Group>
      </Text>

      <Text size="sm" mt="md" weight={500}>
        {alert.summary}
      </Text>

      <Tooltip label="Click for more details" withArrow position="bottom">
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          style={{ float: 'right' }}
          onClick={(e) => { e.stopPropagation(); onInspect(alert); }}
        >
          <IconAlertTriangle size={20} />
        </ActionIcon>
      </Tooltip>
    </Card>
  );
};

export default AlertCard;
