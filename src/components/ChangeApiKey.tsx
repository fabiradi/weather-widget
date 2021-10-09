interface Props {
  currentKey?: string
  onKeyChange?: (newKey: string) => void
}

const ChangeApiKey = ({ currentKey, onKeyChange }: Props) => {
  const handleClearKey = () => {
    onKeyChange?.('')
  }

  const handleSaveKey = () => {
    const newKey = window.prompt('Enter API Key', currentKey)
    if (newKey) {
      onKeyChange?.(newKey)
    }
  }

  return (
    <div>
      <strong>Key:</strong> <code>{currentKey || '---'}</code>{' '}
      <button onClick={handleSaveKey}>{currentKey ? 'Change' : 'Set'}</button>{' '}
      {currentKey && <button onClick={handleClearKey}>Clear</button>}
    </div>
  )
}

export default ChangeApiKey
