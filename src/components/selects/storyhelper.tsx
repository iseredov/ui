import React, { useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import { IRackItemProps } from './BaseRack';
import { IOption } from './helpers/storyHelpers';

export const CustomItem = ({
  value,
  onDelete,
  onEdit,
  onGetUp,
  onGetDown,
}: IRackItemProps<IOption>) => {
  const handleEdit = useCallback(() => {
    action('onEdit')();
    onEdit();
  }, [onEdit]);

  const handleDelete = useCallback(() => {
    action('onDelete')();
    onDelete();
  }, [onDelete]);

  const handleGetUp = useCallback(() => {
    action('onGetUp')();
    onGetUp();
  }, [onGetUp]);

  const handleGetDown = useCallback(() => {
    action('onGetDown')();
    onGetDown();
  }, [onGetDown]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '10px 0',
      }}
    >
      <h1>{value.name}</h1>

      <div>
        <button style={{ marginRight: '10px' }} onClick={handleGetUp}>
          ↑
        </button>
        <button style={{ marginRight: '10px' }} onClick={handleGetDown}>
          ↓
        </button>
        <button style={{ marginRight: '10px' }} onClick={handleEdit}>
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
