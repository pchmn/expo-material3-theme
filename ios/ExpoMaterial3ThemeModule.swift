import ExpoModulesCore

public class ExpoMaterial3ThemeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("getSystemTheme") { () -> AnyObject? in
      return nil
    }

    AsyncFunction("getSystemThemeAsync") { () -> AnyObject? in
     return nil
    }
  }
}
