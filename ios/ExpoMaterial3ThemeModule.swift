import ExpoModulesCore

public class ExpoMaterial3ThemeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("getSystemTheme") { () in
      return nil
    }

    AsyncFunction("getSystemThemeAsync") { () in
     return nil
    }
  }
}
