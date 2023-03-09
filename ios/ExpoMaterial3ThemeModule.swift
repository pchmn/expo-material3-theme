import ExpoModulesCore

public class ExpoMaterial3ThemeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoMaterial3Theme")

    Function("getSystemTheme") { () -> String? in
      nil
    }
  }
}
