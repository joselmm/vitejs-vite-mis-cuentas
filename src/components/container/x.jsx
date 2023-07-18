{
  !clientSelected ? (
    <div
      style={{ margin: '100px auto' }}
      class="col-3 alert alert-primary text-center"
      role="alert"
    >
      Selecciona un cliente
    </div>
  ) : clientSelected &&
    platforms.value.filter((platform) => platform.clientId === clientSelected)
      .length > 0 ? (
    platforms.value
      .filter((platform) => platform.clientId === clientSelected)
      .map((platform) => {
        return (
          <Platform
            remove={openPopupTodeletePlatform}
            copyEmailOrPass={copyEmailOrPass}
            platform={platform}
          />
        );
      })
  ) : (
    <div
      style={{ margin: '100px auto' }}
      class="col-3 alert alert-primary text-center"
      role="alert"
    >
      Nada por aquí
    </div>
  );
}
